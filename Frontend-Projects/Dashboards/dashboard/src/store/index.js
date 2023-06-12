    import { configureStore, ConfigureStore } from "@reduxjs/toolkit";
     import tableslice from "./table-slice";
    const store=configureStore({
        reducer:{ table:tableslice.reducer}
    });

    export default store;