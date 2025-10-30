export interface JobPost {
  id: string;
  title: string;
  clientName: string;
  clientAvatar: string;
  location: string;
  pay: number;
  payType: "hourly" | "fixed";
  description: string;
  tags: string[];
  postedAt: Date;
  featured?: boolean;
}
