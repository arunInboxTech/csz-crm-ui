export interface Course {
    id_course?: number;
    course_id_branch: number;
    course_name: string;
    course_category: string;
    course_duration: string;
    course_content: string;
    course_shedule: string;
    course_fee: string;
}

export interface CourseResponse {
    message: string;
    id_course?: number;
}