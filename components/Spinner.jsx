"use client"; // without this, for some reason, the spinner won't spin

/**
 * Spinner for client rendered components
 */

import { ClipLoader } from "react-spinners";

const override = {
    display: "block",
    margin: "100px auto",
};

const Spinner = ({ loading }) => {
    return (
        <ClipLoader
            color="#3b82f6"
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
        />
    );
};
export default Spinner;
