import ResolverContainer from "@/components/Resolver";
import * as styles from "../style.css";

const Merge = ({ title, contents }: { title: string; contents: string }) => {
  return (
    <div className={styles.background}>
      <ResolverContainer title={title} contents={contents} />
    </div>
  );
};

export default Merge;
