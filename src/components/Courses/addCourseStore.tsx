import { Store } from "@tanstack/store";

export type CartCourse = {
    id: number;
    userId: string;
    course_id: number;
    course: {
        id: number;
        image: string;
        course_name: string;
        description: string;
        duration: number;
        price: number;
        user?: { name: string };
    };
};

export type CoursesState = {
    cart: CartCourse[];
};

export const CourseStore = new Store<CoursesState>({
    cart: [],
});

export const courseActions = {
    setCart: (items: CartCourse[]) => {
        CourseStore.setState(() => ({
            cart: items,
        }));
    },

    addToCart: (item: CartCourse) => {
        CourseStore.setState((state) => {
            const exists = state.cart.some(
                (c) => c.course.id === item.course.id
            );
            if (exists) return state;

            return {
                cart: [...state.cart, item],
            };
        });
    },

    // course id ke base pe remove
    removeFromCart: (courseId: number) => {
        CourseStore.setState((state) => ({
            cart: state.cart.filter(
                (c) => c.course.id !== courseId
            ),
        }));
    },
    removeAllCart: () => {
        CourseStore.setState(() => ({
            cart: [],
        }));
    },
};
