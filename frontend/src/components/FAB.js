import { useState, memo } from "react";
import { Box, Fab, Modal } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import AddProduct from "./AddProduct";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
};

const FAB = ({ fetchProducts }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Box sx={{ position: "fixed", bottom: 15, right: 15 }}>
            <Fab onClick={handleOpen} color="primary" aria-label="add">
                <AddIcon />
            </Fab>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <AddProduct
                        handleClose={handleClose}
                        fetchProducts={fetchProducts}
                    />
                </Box>
            </Modal>
        </Box>
    );
};

export default memo(FAB);
