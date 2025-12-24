export interface TeamMember {
  id: string;
  name: string;
  role?: string;
}

export interface Category {
  name: string;
  description: string;
}

export interface Video {
  id: string;
  videoId: string;
  title: string;
  thumbnail: string;
  teamName: string;
  className: string;
  teamMembers: string[];
  description?: string;
  heartCount: number;
}
