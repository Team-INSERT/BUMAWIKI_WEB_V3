/* eslint-disable */
"use client";

import Container from "@/components/Container";
import { MouseEvent, useState } from "react";
import { docsQuery } from "@/services/docs/docs.query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CLASSIFY, ROLE } from "@/record";
import Accordion from "@/components/Accordion";
import * as docsStyles from "@/app/(docs)/[classify]/style.css";
import {
  useCreateDocsMutation,
  useDeleteDocsMutation,
  useRenameDocsMutation,
} from "@/services/docs/docs.mutation";
import { useDate, useModal } from "@/hooks";
import useDebounce from "@/hooks/useDebounce";
import { useChangeUserAuthorityMutation } from "@/services/user/user.mutation";
import { userQuery } from "@/services/user/user.query";
import * as styles from "./style.css";
import { UserType } from "@/types";

const AdminPage = () => {
  const [selectedManageTab, setSelectedManageTab] = useState("유저 관리");
  const [keyword, setKeyword] = useState("");
  const debounceValue = useDebounce(keyword, 200);

  const handleChangeSelectTab = (type: string) => {
    setSelectedManageTab(type);
    setKeyword("");
  };

  return (
    <Container title="관리자 페이지" docsType="관리자 페이지">
      <main className={styles.managementContainer}>
        <hgroup className={styles.managementTabContainer}>
          {["유저 관리", "문서 관리"].map((type) => (
            <button
              onClick={() => handleChangeSelectTab(type)}
              key={type}
              className={styles.docsType[String(type === selectedManageTab)]}
            >
              {type}
            </button>
          ))}
        </hgroup>
        <line className={styles.line} />
        <hgroup>
          <input
            onChange={({ target: { value } }) => setKeyword(value)}
            value={keyword}
            placeholder="검색어를 입력하세요..."
            className={styles.searchInput}
          />
        </hgroup>
        {selectedManageTab === "유저 관리" && <UserManagement debounceValue={debounceValue} />}
        {selectedManageTab === "문서 관리" && <DocsManagement debounceValue={debounceValue} />}
      </main>
    </Container>
  );
};

interface ManagementProps {
  debounceValue: string;
}

const UserManagement = ({ debounceValue }: ManagementProps) => {
  const { data: userList, isSuccess, isError } = useQuery(userQuery.list());
  const { data: myInfo, isSuccess: isUserSuccess } = useQuery(userQuery.my());
  const { mutateAsync: updateUserAuthority } = useChangeUserAuthorityMutation();
  const { openConfirm, openToast } = useModal();
  const queryClient = useQueryClient();
  const { mutateAsync: createDocs } = useCreateDocsMutation();

  const filterUserList = userList?.filter((user: UserType) => user.name.includes(debounceValue));

  const handleCreateUser = async () => {
    const isMany = prompt("1명 추가할거면 넹 2명 추가할거면 아뇽 적으셈");
    if (isMany === "넹") {
      const title = prompt("이름입력하세");
      if (!title) return alert("님아 빈칸안됨");
      const contents = prompt("디폴트로넣을내용입력하세 없으면 빈칸") ?? "";
      const docsType = "STUDENT";
      const enroll = Number(prompt("몇년도 입학인지 적으셈 2022 2023 이렇게"));
      if (!enroll || Number.isNaN(enroll) || enroll < 2022 || enroll > new Date().getFullYear())
        return alert("님아 똑바로");
      alert("ㄱㅅ ㄱㄷㄱㄷ");

      await createDocs({
        title,
        contents,
        enroll,
        docsType,
      });
      alert("다됨 굳");
      window.location.reload();
    } else if (isMany === "아뇽") {
      const title = prompt(
        "배열로 이름입력하셈 그거 순서대로 호출할거임 그리고 중복있으면안됨 중복있는지확인하고 중복이면 이름뒤에 (5기) 이런식으로 기수붙이세요 같은기수면 1, 2 이렇게",
      );
      if (!title) return alert("님아 빈칸안됨");
      const contents = prompt("디폴트로넣을내용입력하세 다똑같이들어감 없으면 빈칸") ?? "";
      const docsType = "STUDENT";
      const enroll = Number(prompt("몇년도 입학인지 적으셈 2022 2023 이렇게"));
      if (!enroll || Number.isNaN(enroll) || enroll < 2022 || enroll > new Date().getFullYear())
        return alert("님아 똑바로");
      alert("ㄱㅅ ㄱㄷㄱㄷ");

      try {
        const titleList = JSON.parse(title);
        titleList.map(async (newTitle: string) => {
          await createDocs({
            title: newTitle,
            contents,
            enroll,
            docsType,
          });
          return newTitle;
        });
        alert("다됨 굳");
        window.location.reload();
      } catch {
        alert("님아 이거 배열이아닌거같은데 아니면 토큰 만료됨 다시 ㄱㄱ");
      }
      window.location.reload();
    } else {
      openToast("뭔데이거는 다시하셈");
    }
  };

  const handleUpdateUserAuthority = async ({
    id,
    authority,
    name,
    email,
  }: {
    id: number;
    authority: string;
    name: string;
    email: string;
  }) => {
    openConfirm({
      content: `정말로 ${name}(id: ${id}) 유저를 권한을 ${ROLE[authority]}로 변경하시겠습니까?`,
      onConfirm: async () => {
        await updateUserAuthority({ email, authority });
        queryClient.invalidateQueries({ queryKey: userQuery.list().queryKey });
        openToast("유저 권한이 변경되었습니다!");
      },
    });
  };

  if ((isUserSuccess && myInfo.authority !== "ADMIN") || isError)
    return <div>권한이 없습니다.</div>;

  return (
    <section className={styles.managementContainer}>
      <line className={styles.line} />
      <article>
        <button onClick={handleCreateUser} className={styles.docsType.true}>
          학생 추가하기
        </button>
      </article>
      {isSuccess ? (
        <>
          {(debounceValue.length ? filterUserList : userList).map((user: UserType) => (
            <article className={docsStyles.container}>
              <div className={styles.docs}>
                <hgroup className={docsStyles.titleBox}>
                  <h1 className={docsStyles.title}>
                    {user.name}({user.nickName})
                  </h1>
                  <span>{ROLE[user.authority]}</span>
                </hgroup>
                <hgroup className={docsStyles.titleBox}>
                  <button
                    onClick={() => handleUpdateUserAuthority({ ...user, authority: "ADMIN" })}
                    className={styles.docsType.true}
                  >
                    관리자 위임
                  </button>
                  <button
                    onClick={() => handleUpdateUserAuthority({ ...user, authority: "USER" })}
                    className={styles.docsType.true}
                  >
                    밴 해제
                  </button>
                  <button
                    onClick={(e) => handleUpdateUserAuthority({ ...user, authority: "BANNED" })}
                    className={styles.deleteButton}
                  >
                    밴
                  </button>
                </hgroup>
              </div>
            </article>
          ))}
        </>
      ) : (
        <div>loading...</div>
      )}
    </section>
  );
};

const DocsManagement = ({ debounceValue }: ManagementProps) => {
  const [selectedDocsType, setSelectedDocsType] = useState("ACCIDENT");
  const queryKeyDocsType = selectedDocsType.toLowerCase();
  const { formatDate } = useDate();
  const { data: docsList, isSuccess: isSuccessDocsList } = useQuery(
    docsQuery.list(queryKeyDocsType),
  );
  const { mutateAsync: deleteDocs } = useDeleteDocsMutation();
  const { mutateAsync: renameDocs } = useRenameDocsMutation();
  const queryClient = useQueryClient();

  const { openConfirm, openToast } = useModal();

  const handleEditDocsNameClick = (legacyTitle: string) => {
    // eslint-disable-next-line no-alert
    const title = prompt("변경할 문서명을 입력해주세요. (똥퀄 ㅈㅅ V3에 없었는데 급하게만드느라)");
    if (!title) return openToast("문서명을 입력하세요!");
    openConfirm({
      content: `정말로 문서 이름을 "${title}"로 변경하시겠습니까?`,
      onConfirm: async () => {
        await renameDocs({ title, legacyTitle });
        queryClient.invalidateQueries({ queryKey: docsQuery.list(queryKeyDocsType).queryKey });
        openToast("문서명이 변경되었습니다!");
      },
    });
  };

  const handleDeleteDocsClick = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    openConfirm({
      content: "정말로 문서를 삭제하시겠습니까?",
      onConfirm: async () => {
        await deleteDocs(id);
        queryClient.invalidateQueries({ queryKey: docsQuery.list(queryKeyDocsType).queryKey });
        openToast("문서가 삭제되었습니다!");
      },
    });
  };

  return (
    <section className={styles.managementContainer}>
      <line className={styles.line} />
      <hgroup className={styles.managementTabContainer}>
        {[
          "STUDENT",
          "ACCIDENT",
          "TEACHER",
          "MAJOR_TEACHER",
          "MENTOR_TEACHER",
          "CLUB",
          "FREE_CLUB",
          "FRAME",
        ].map((type) => (
          <button
            onClick={() => setSelectedDocsType(type)}
            key={type}
            className={styles.docsType[String(type === selectedDocsType)]}
          >
            {CLASSIFY[type]}
          </button>
        ))}
      </hgroup>
      {isSuccessDocsList ? (
        <>
          {debounceValue.length ? (
            <Accordion title={`검색결과:${debounceValue}`}>
              {docsList?.keys
                .map((key) => docsList.data[key])
                .flat()
                .filter((docs) => docs.title.includes(debounceValue))
                .map((docs) => (
                  <article key={docs.id} className={docsStyles.container}>
                    <div className={styles.docs}>
                      <hgroup className={docsStyles.titleBox}>
                        <h1 className={docsStyles.title}>{docs.title}</h1>
                        <span className={docsStyles.lastModifiedAt}>
                          최근 수정일 ·&nbsp;
                          {formatDate(docs.lastModifiedAt)}
                        </span>
                      </hgroup>
                      <hgroup className={docsStyles.titleBox}>
                        <button
                          onClick={() => handleEditDocsNameClick(docs.title)}
                          className={styles.docsType.true}
                        >
                          문서명 변경
                        </button>
                        <button
                          onClick={(e) => handleDeleteDocsClick(e, docs.id)}
                          className={styles.deleteButton}
                        >
                          삭제
                        </button>
                      </hgroup>
                    </div>
                  </article>
                ))}
            </Accordion>
          ) : (
            docsList.keys.map((key: string) => (
              <Accordion title={`${key}년 ${CLASSIFY[selectedDocsType]}`} key={key}>
                {docsList.data[key].map((docs) => (
                  <article key={docs.id} className={docsStyles.container}>
                    <div className={styles.docs}>
                      <hgroup className={docsStyles.titleBox}>
                        <h1 className={docsStyles.title}>{docs.title}</h1>
                        <span className={docsStyles.lastModifiedAt}>
                          최근 수정일 ·&nbsp;
                          {formatDate(docs.lastModifiedAt)}
                        </span>
                      </hgroup>
                      <hgroup className={docsStyles.titleBox}>
                        <button
                          onClick={() => handleEditDocsNameClick(docs.title)}
                          className={styles.docsType.true}
                        >
                          문서명 변경
                        </button>
                        <button
                          onClick={(e) => handleDeleteDocsClick(e, docs.id)}
                          className={styles.deleteButton}
                        >
                          삭제
                        </button>
                      </hgroup>
                    </div>
                  </article>
                ))}
              </Accordion>
            ))
          )}
        </>
      ) : (
        <div>loading...</div>
      )}
    </section>
  );
};

export default AdminPage;
