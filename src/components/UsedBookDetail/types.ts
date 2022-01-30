export interface MatchProps {
  match: {
    isExact: boolean;
    params: { id: string };
    path: string;
    url: string;
  };
}
