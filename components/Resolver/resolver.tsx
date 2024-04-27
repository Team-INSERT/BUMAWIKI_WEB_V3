"use client";

import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { docsQuery } from "@/services/docs/docs.query";
import { useMergeDocsMutation } from "@/services/docs/docs.mutation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import useModal from "@/hooks/useModal";
import Toastify from "../Toastify";
import * as styles from "./style.css";

interface LineObject {
  index?: number;
  operation: string;
  subOperation?: string;
  text: string;
}

interface RangeType {
  start: number;
  end: number;
}

interface PropsType {
  title: string;
  contents: string;
}

const Resolver = ({ title, contents }: PropsType) => {
  const { mutateAsync: merge } = useMergeDocsMutation();
  const { data } = useSuspenseQuery(docsQuery.conflicted(title, contents));
  const [arr1, setArr1] = useState(spliting(data.diff1));
  const [arr2, setArr2] = useState(spliting(data.diff2));
  const [std, setStd] = useState(spliting(data.originalDocsContent));
  const [backUp, setBakcUp] = useState({ arr1, std, arr2 });

  const router = useRouter();
  const queryClient = useQueryClient();

  const { closeModal } = useModal();

  useEffect(() => {
    return () => {
      standardization();
    };
  }, []);

  function spliting(arr: LineObject[] | string) {
    let result: LineObject[] = [];
    let start = 0;
    const str =
      typeof arr === "object"
        ? arr
            .map((obj: LineObject) => {
              if (obj.operation === "INSERT") return `[diff]${obj.text}[/diff]`;
              if (obj.operation === "DELETE") return `[delete]${obj.text}[/delete]`;
              return obj.text;
            })
            .join("")
        : arr;

    for (let i = 0; i < str.length; i += 1) {
      if (str[i] === "\n") {
        const range = str.substring(start, i + 1);
        if (range.includes("[/delete]") && range.includes("[diff]")) {
          result.push({
            operation: "DELETE",
            text: `${range.replace(/\[diff\].+?\[\/diff\]/gs, "").replace(/\[diff\].+/gs, "")}`,
          });
          result.push({
            operation: "DIFFERENT",
            subOperation: "CHANGE",
            text: `[change]${range.replace(/\[delete\].+?\[\/delete\]/gs, "").replace(/.+\[\/delete\]/gs, "")}`,
          });
        } else {
          result.push({
            operation: "EQUAL",
            text: `${range}`,
          });
        }

        start = i + 1;
      }

      if (str.slice(start, str.length).indexOf("\n") === -1) {
        result.push({ operation: "EQUAL", text: str.substring(start, str.length) });
        break;
      }
    }

    result.map((i, index) => {
      if (
        (i.text.includes("[delete]") && i.text.includes("[/delete]")) ||
        (i.text.includes("[delete]") && result[index + 1]?.text.startsWith("[/delete]")) ||
        (result[index - 1]?.text.endsWith("[delete]\n") && i.text.includes("[/delete]"))
      )
        return (i.operation = "DELETE");
      if (
        i.text.includes("[delete]") &&
        !i.text.includes("[/delete]") &&
        (!i.text.endsWith("[delete]\n") || i.text.length < 12)
      )
        return (i.operation = "DELETE1");
      if (
        (!i.text.includes("[delete]") && i.text.slice(9).includes("[/delete]")) ||
        (i.text.slice(9).includes("[/delete]") &&
          !result[index - 1]?.text.endsWith("[delete]\n")) ||
        result[index + 1]?.text.startsWith("[/delete]") ||
        (!result[index - 1]?.text.endsWith("[delete]\n") &&
          (i.text.endsWith("[/delete]\n") || i.text.endsWith("[/delete]")))
      )
        return (i.operation = "DELETE2");
    });

    // del체크
    const delRange: RangeType[] = [];
    for (let i = 0; i < result.length; i += 1) {
      if (result[i].operation === "DELETE1") {
        delRange.push({ start: i, end: 0 });
      }
      if (result[i].operation === "DELETE2") {
        if (delRange.findIndex((item) => item.end === 0) !== -1)
          delRange[delRange.findIndex((item) => item.end === 0)].end = i;
      }
    }

    result.map((item, index) => {
      delRange.forEach((range) => {
        if (index >= range.start && index <= range.end) {
          item.text = "";
          return (item.operation = "DELETES");
        }
      });
    });

    result.map((i, index) => {
      if (
        (((i.text.includes("[diff]") && i.text.includes("[/diff]")) ||
          (i.text.includes("[diff]") && result[index + 1]?.text.startsWith("[/diff]"))) &&
          !i.text.includes("[diff][/diff]")) ||
        (result[index - 1]?.text.endsWith("[diff]\n") && i.text.includes("[/diff]"))
      )
        return (i.operation = "DIFFERENT");
      if (
        (i.text.includes("[diff]") &&
          !i.text.includes("[/diff]") &&
          !i.text.endsWith("[diff]\n")) ||
        (i.text.startsWith("[diff]") && !i.text.includes("[/diff]")) ||
        (i.text.includes("[diff]") &&
          i.text.includes("[change]") &&
          !i.text.includes("[/diff]") &&
          !result[index + 1]?.text.startsWith("[/diff]")) ||
        (result[index - 1]?.text.endsWith("[diff]\n") &&
          result[index - 1]?.operation !== "DIFFERENT1" &&
          !i.text.includes("[/diff]"))
      ) {
        return (i.operation = "DIFFERENT1");
      }
      if (
        (!i.text.includes("[diff]") && result[index + 1]?.text.startsWith("[/diff]")) ||
        (!i.text.includes("[diff]") && !i.text.startsWith("[/diff]") && i.text.includes("[/diff]"))
      )
        return (i.operation = "DIFFERENT2");
    });

    //diff체크

    const diffRange: RangeType[] = [];
    for (let i = 0; i < result.length; i += 1) {
      if (result[i].operation === "DIFFERENT1") {
        diffRange.push({ start: i, end: 0 });
      }
      if (result[i].operation === "DIFFERENT2") {
        if (diffRange.findIndex((item) => item.end === 0) !== -1)
          diffRange[diffRange.findIndex((item) => item.end === 0)].end = i;
      }
    }

    result.map((item, index) => {
      diffRange.forEach((range) => {
        if (range.end - range.start === 1) return;
        if (index >= range.start && index <= range.end) {
          return (item.operation = "DIFFERENTS");
        }
        if (index > range.start && index < range.end) {
          return (item.operation = "DIFFERENTS");
        }
      });
    });

    result = result.filter((i) => i.text !== "[change][diff]\n");

    return result;
  }

  const count = () => {
    let countA = 0;
    let countB = 0;
    arr1.forEach((i) => {
      if (
        ["DIFFERENT", "DIFFERENTS", "DIFFERENT2", "DIFFERENT2"].includes(i.operation) &&
        !i.text.includes("[change]")
      )
        countA += 1;
    });

    arr2.forEach((i) => {
      if (
        ["DIFFERENT", "DIFFERENTS", "DIFFERENT2", "DIFFERENT2"].includes(i.operation) &&
        !i.text.includes("[change]")
      )
        countB += 1;
    });

    return { firstArr: countA, secondArr: countB };
  };

  const comparing = (pram1: LineObject, pram2: LineObject, pram3: LineObject) => {
    const a1 = {
      operation: pram1?.operation ?? "UNDEFINED",
      text: pram1?.text.replace("\n", "").replace(/\[diff\].+?\[\/diff\]/gs, "") ?? "UNDEFINED",
    };
    const a2 = {
      operation: pram2?.operation ?? "UNDEFINED",
      text: pram2?.text.replaceAll("\n", "") ?? "UNDEFINED",
    };
    const a3 = {
      operation: pram3?.operation ?? "UNDEFINED",
      text: pram3?.text.replace("\n", "").replace(/\[diff\].+?\[\/diff\]/gs, "") ?? "UNDEFINED",
    };

    if (
      ((a1.operation === "DIFFERENT" && a1.text.includes(a2.text) && a2.text !== "") ||
        a1.operation === "EQUAL") &&
      ((a3.operation === "DIFFERENT" && a3.text.includes(a2.text) && a2.text !== "") ||
        a3.operation === "EQUAL")
    ) {
      return { insert: "none" };
    }
    if (
      (["DIFFERENT", "DIFFERENTS", "DIFFERENT1", "DIFFERENT2"].includes(a1.operation) &&
        (["DELETE", "DELETES", "EQUAL"].includes(a3.operation) ||
          (a3.operation === "DIFFERENT" && a3.text.includes(a2.text === "" ? "SPACE" : a2.text))) &&
        !(a1.operation === "DIFFERENT" && a1.text.includes(a2.text === "" ? "SPACE" : a2.text)) &&
        !["DELETE", "DELETE1", "DELETE2", "DELETES"].includes(a1.operation)) ||
      (a1.text.includes("[change]") && !a3.text.includes("[change]")) ||
      (a1.operation !== "UNDEFINED" && a3.operation === "UNDEFINED")
    ) {
      return { insert: "first" };
    }
    if (
      (["DIFFERENT", "DIFFERENTS", "DIFFERENT1", "DIFFERENT2"].includes(a3.operation) &&
        (["DELETE", "DELETES", "EQUAL"].includes(a1.operation) ||
          (a1.operation === "DIFFERENT" && a1.text.includes(a2.text))) &&
        !(a3.operation === "DIFFERENT" && a3.text.includes(a2.text))) ||
      (a3.text.includes("[change]") && !a1.text.includes("[change]")) ||
      (a1.operation === "UNDEFINED" && a3.operation !== "UNDEFINED")
    ) {
      return { insert: "third" };
    }
    if (
      (["DIFFERENT", "DIFFERENTS", "DIFFERENT1", "DIFFERENT2"].includes(a1.operation) &&
        ["DIFFERENT", "DIFFERENTS", "DIFFERENT1", "DIFFERENT2"].includes(a3.operation)) ||
      (a1.text.includes("[change]") && a3.text.includes("[change]"))
    ) {
      return { insert: "both" };
    }

    return { insert: "undefined" };
  };

  const standardization = () => {
    const newStd = [...std];
    const newArr1 = [...arr1];
    const newArr2 = [...arr2];
    const counted = count();

    const longer = arr1.length > arr2.length ? arr1.length : arr2.length;
    const len = longer + counted.firstArr + counted.secondArr;

    for (let index = 0; index < len; index += 1) {
      if (!(newArr1[index]?.operation === "EQUAL" && newArr2[index]?.operation === "EQUAL")) {
        const result = comparing(newArr1[index], newStd[index], newArr2[index]);
        if (result.insert === "first") {
          newStd.splice(index, 0, { operation: "EMPTY", text: "EMPTY" });
          newArr2.splice(index, 0, { operation: "EMPTY", text: "EMPTY" });
        }
        if (result.insert === "third") {
          newStd.splice(index, 0, { operation: "EMPTY", text: "EMPTY" });
          newArr1.splice(index, 0, { operation: "EMPTY", text: "EMPTY" });
        }
        if (result.insert === "both") {
          newStd.splice(index, 0, { operation: "EMPTY", text: "EMPTY" });
        }
      }

      if (newArr1[index]) {
        newArr1[index].text = newArr1[index]?.text
          .replaceAll("[diff]", "")
          .replaceAll("[/diff]", "")
          .replaceAll("[change]", "")
          .replace(/\[delete\].+?\[\/delete\]/gs, "")
          .replace(/\[delete\].+?/gs, "")
          .replace(/.+?\[\/delete\]/gs, "")
          .replace("[delete]", "")
          .replace("[/delete]", "");
      }
      if (newArr2[index])
        newArr2[index].text = newArr2[index]?.text
          .replaceAll("[diff]", "")
          .replaceAll("[/diff]", "")
          .replaceAll("[change]", "")
          .replace(/\[delete\].+?\[\/delete\]/gs, "")
          .replace(/\[delete\].+/gs, "")
          .replace(/.+\[\/delete\]/gs, "")
          .replace("[delete]", "")
          .replace("[/delete]", "");
    }

    setStd(newStd);
    setArr1(newArr1);
    setArr2(newArr2);
    setBakcUp({ arr1: newArr1, std: newStd, arr2: newArr2 });
  };

  const onClickSelectLine = (index: number, obj: LineObject) => {
    const newStd = [...std];
    newStd[index] = obj;
    setStd(newStd);
  };

  const rollBack = () => {
    setArr1(backUp.arr1);
    setStd(backUp.std);
    setArr2(backUp.arr2);
  };

  const onClickJoinArr = async () => {
    const str = std
      .map((obj: LineObject, index) => {
        if (
          obj.operation !== "EMPTY" &&
          !(
            ["DELETE", "DELETES"].includes(obj.operation) &&
            !(obj.text === "") &&
            std[index + 1]?.subOperation === "CHANGE"
          )
        )
          return obj.text;
      })
      .join("");

    try {
      await merge({ title, contents: str, version: data.lastVersion });
      toast(<Toastify content="출동이 해소되었습니다!" />);
      queryClient.invalidateQueries(docsQuery.title(encodeURI(title)));
      queryClient.invalidateQueries(docsQuery.lastModified(0));
      router.push(`/docs/${title}`);
      closeModal();
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(<Toastify content={err.response?.data.message} />);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <div className={styles.titleBar}>
          <p className={styles.title}>충돌이 발생한 문서: {title}</p>
          <button onClick={() => rollBack()} className={styles.rollBackButton}>
            되돌리기
          </button>
        </div>
        <div className={styles.notice}>
          <p>
            한 명 이상의 사용자가 문서를 동시에 수정하여 충돌이 발생하였습니다. <br />
            화살표를 클릭하여 문서에 적용시킬 영역을 선택해주세요.
          </p>
        </div>
      </div>
      <div className={styles.comparingBox}>
        <div className={styles.docsList}>
          {["First", "Original", "Second"].map((item) => (
            <div key={item} className={styles.docsItem}>
              {item}
            </div>
          ))}
        </div>
        <div className={styles.changeList}>
          <div className={styles.changeItem}>
            {arr1.map((i, index) => (
              <div key={index} className={styles.item[i.operation]}>
                <p className={styles.text}>
                  {i.text === "\n" || i.text === " " || i.text === " \n" ? <br /> : i.text}
                </p>
                {!(std[index] === i) && i.operation !== "EQUAL" && i.operation !== "EMPTY" && (
                  <div className={styles.select} onClick={() => onClickSelectLine(index, i)}>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.changeItem}>
            {std.map((i, index) => (
              <div key={index} className={styles.item[i.operation]}>
                <p className={styles.text}>
                  {i.text === "\n" || i.text === " " || i.text === "" || i.text === " \n" ? (
                    <br />
                  ) : (
                    i.text
                  )}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.changeItem}>
            {arr2.map((i, index) => (
              <div key={index} className={styles.item[i.operation]}>
                {!(std[index] === i) && i.operation !== "EQUAL" && i.operation !== "EMPTY" && (
                  <div className={styles.select} onClick={() => onClickSelectLine(index, i)}>
                    ←
                  </div>
                )}
                <p className={styles.text}>
                  {i.text === "\n" || i.text === " " || i.text === "" || i.text === " \n" ? (
                    <br />
                  ) : (
                    i.text
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => onClickJoinArr()} className={styles.writeButton}>
        병합하기
      </button>
    </div>
  );
};

export default Resolver;
