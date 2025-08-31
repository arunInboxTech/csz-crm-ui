export interface Batch {
    batch_id?: number;
    batch_branch_id: number;
    batch_course_id: number;
    batch_name: string;
    trainer_id: number;
    expected_joiner: string;
    batch_expected_completion_date: string;
    start_date: string;
    is_batch_completed: '0' | '1';
    batch_completed_date: string;
    batch_status: string;
    course_name?:string
}

export interface BatchResponse {
    message: string;
    batch_id?: number;
}