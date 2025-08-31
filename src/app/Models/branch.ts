export interface Branch {
  id_branch?: number;
  branch_name: string;
  branch_address: string;
  branch_phone1: string;
  branch_phone2?: string;
}

export interface BranchResponse {
  message: string;
  id_branch?: number;
}
