import { Store } from 'pullstate';

const CategoryStore = new Store({

	categories: [
        {
            id: 1,
            name: "Business",
            count: "34",
            color: "#60b660"
        },
        {
            id: 2,
            name: "Personal",
            count: "12",
            color: "#1D68DF"
        },
        {
            id: 3,
            name: "Leisure",
            count: "23",
            color: "#EB06FF"
        }
    ]
});

export default CategoryStore;