type Record = {
  isLose: string;
  isWin: boolean;
  originScore: number;
  playerId: number;
  reserveFees: string;
  reserveFeesDigits: number;
  score: string;
};

type Records = {
  abandon: boolean;
  id: number;
  record: Record[];
};

type BattlesDoc = {
  createTime: string;
  isFinished: boolean;
  isOverdue: boolean;
  isStarted: boolean;
  lastUpdate: string;
  managerOpenId: string;
  players: [];
  playersCountToRecord: number;
  records: Records[];
  reserveFees: boolean;
  totalReserveFees: number;
  verifySum: boolean;
  wxaCodeUrl: string;
  _id: string;
  _openid: string;
};

export type { Record, Records, BattlesDoc };
