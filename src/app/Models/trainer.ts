export interface Trainer {
    trainer_id?: number;
    trainer_branch_id: number;
    trainer_name: string;
    trainer_phone: string;
    trainer_email: string;
    trainer_username?: string;
    trainer_password?: string;
    trainer_address: string;
    trainer_status: string;
}

export interface TrainerResponse {
    message: string;
    trainer_id?: number;
}