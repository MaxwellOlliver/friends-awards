export type VotesContextProps = {
  votes: Map<string, string>;
  registerVote: (category: string, nominee: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};
