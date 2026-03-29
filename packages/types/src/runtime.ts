export type UserRole = "guest" | "member" | "reviewer" | "admin";

export type RuntimeContext = {
  user: {
    id: string;
    role: UserRole;
  };
};
