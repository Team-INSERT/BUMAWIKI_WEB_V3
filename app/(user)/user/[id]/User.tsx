"use client";

import Accordion from "@/components/Accordion";
import { FC } from "react";
import { 조사, particle } from "auto-particle";
import Container from "@/components/Container";
import { userQuery } from "@/services/user/user.query";
import { CLASSIFY, ROLE } from "@/record";
import { useQuery } from "@tanstack/react-query";
import ContritbuteDocsList from "../../ContritbuteDocsList";

const User: FC<{ id: number }> = ({ id }) => {
  const { data: user, isSuccess } = useQuery(userQuery.id(id));

  if (!isSuccess) return null;

  return (
    <Container title={user.nickName} docsType={CLASSIFY.유저}>
      <Accordion title="유저 정보">
        {particle(user.nickName).word(조사.은_는)} 부마위키의 {ROLE[user.authority]}
        이다.
      </Accordion>
      <ContritbuteDocsList contributes={user.contributeDocs} />
    </Container>
  );
};

export default User;
