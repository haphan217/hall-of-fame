export interface TeamMember {
  id: string;
  name: string;
  role?: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  teamName: string;
  className: string;
  teamMembers: TeamMember[];
  description?: string;
  heartCount: number;
}
