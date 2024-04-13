const CLASSIFY = {
  MENTOR_TEACHER: "멘토 선생님",
  MAJOR_TEACHER: "전공교과 선생님",
  TEACHER: "보통교과 선생님",
  ACCIDENT: "사건/사고",
  CLUB: "전공 동아리",
  FREE_CLUB: "사설 동아리",
  READONLY: "읽기전용",
  NOTICE: "공지사항",
  STUDENT: "학생",
  FRAME: "틀",
  "멘토 선생님": "MENTOR_TEACHER",
  "전공교과 선생님": "MAJOR_TEACHER",
  "보통교과 선생님": "TEACHER",
  "사건/사고": "ACCIDENT",
  "전공 동아리": "CLUB",
  "사설 동아리": "FREE_CLUB",
  읽기전용: "READONLY",
  공지사항: "NOTICE",
  학생: "STUDENT",
  틀: "FRAME",
} as Record<string, string>;

export default CLASSIFY;
