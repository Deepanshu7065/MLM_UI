import { Store } from "@tanstack/store";

export type CoursesOpen = {
    viewOpen: {
        id: string
        open: boolean;
    };
    saveData: {
        data: any;
    }
};

export const initialState: CoursesOpen = {
    viewOpen: {
        id: '',
        open: false,
    },
    saveData: {
        data: [],
    }
};

export const CourseStore3 = new Store<CoursesOpen>(initialState);


export const openViewModal = {
    open: (id?: any) => {
        CourseStore3.setState((state) => ({
            ...state,
            editOpen: {
                id: id ?? '',
                open: true,
            }
        }))
    },
    close: () => {
        CourseStore3.setState((state) => ({
            ...state,
            editOpen: {
                id: '',
                open: false,
                deviceData: null
            }
        }))
    }
}

export const courseStoreData = {
    saveData: (data: any) => {
        CourseStore3.setState((state) => ({
            ...state,
            saveData: {
                data: data
            }
        }))
    },
    closeData: () => {
        CourseStore3.setState((state) => ({
            ...state,
            saveData: {
                data: []
            }
        }))
    }
}


export const CoursesUIStore = {
    openViewModal,
    courseStoreData
}
