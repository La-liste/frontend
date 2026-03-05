import { useState } from "react";
import { Stack } from "@mui/material";
import { TitleBig } from "../../components";
import Welcome from "./steps/welcome";
import Username from "./steps/username";
import Password from "./steps/password";
import Home from "./steps/home";
import Done from "./steps/done";

export default function Setup({ setNeedsSetup }: { setNeedsSetup: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [step, setStep] = useState(1);

    return (
        <Stack sx={{ justifyContent: "center", alignItems: "center", minHeight: "80dvh" }}>
            <TitleBig />
            {step === 1 && <Welcome setStep={setStep} />}
            {step === 2 && <Username setStep={setStep} />}
            {step === 3 && <Password setStep={setStep} />}
            {step === 4 && <Home setStep={setStep} />}
            {step === 5 && <Done setNeedsSetup={setNeedsSetup} />}
        </Stack>
    );
}