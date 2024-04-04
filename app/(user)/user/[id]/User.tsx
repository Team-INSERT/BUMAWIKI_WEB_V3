"use client";

import Accordion from "@/components/Accordion";
import { FC } from "react";
import { 조사, particle } from "auto-particle";
import { translateAuthority } from "@/utils";
import Container from "@/components/Container";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userQuery } from "@/services/user/user.query";
import * as styles from "../../style.css";
import ContritbuteDocsList from "../../ContritbuteDocsList";

const User: FC<{ id: number }> = ({ id }) => {
  const { data: user } = useSuspenseQuery(userQuery.id(id));

  return (
    <Container title={user.nickName} docsType="user">
      <div className={styles.container}>
        <Accordion title="유저 정보">
          {particle(user.nickName).word(조사.은_는)} 부마위키의 {translateAuthority(user.authority)}
          이다.
        </Accordion>
        <ContritbuteDocsList contributes={user.contributeDocs} />
      </div>
    </Container>
  );
};

export default User;
