import React from 'react';
import {Button} from "@mui/material";

type FormProps = {
    title: string
    handleClick: () => void
}
export const Form: React.FC<FormProps> = React.memo(({title, handleClick}) => {
    return (
        <div>
            <Button onClick={handleClick} variant={"outlined"}>{title}</Button>
        </div>
    );
});

