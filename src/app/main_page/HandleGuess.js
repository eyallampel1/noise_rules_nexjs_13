// Helper function to determine the case value for switch
const getNoiseRuleCase = (constraintClassName) => {
    const lowercasedName = constraintClassName.toLowerCase();

    if (lowercasedName.includes("mgt")) {
        if (lowercasedName.includes("pcie")) {
            return "MGT_VHS";
        } else {
            return "MGT";
        }
    }
    if (lowercasedName.includes("pcie")) return "PCIE";
    if (lowercasedName.includes("mdi")) return "GBE";
    if (lowercasedName.includes("bus")) return "REGULAR";
    if (lowercasedName.includes("fast")) return "FAST";
    if (lowercasedName.includes("not_critical") || lowercasedName.includes("power") || lowercasedName.includes("pwr")) return "NONE";
    if (lowercasedName.includes("clock") || lowercasedName.includes("clk")) return "CLOCK";
    // ... add more conditions as needed
    return "DEFAULT";
}

export const handleGuess = (tableData) => {
    const guessedData = tableData.map((row) => {
        let inClassValue, outClassValue;

        switch (getNoiseRuleCase(row.constraintClassName)) {
            case "MGT_VHS":
                inClassValue = "MGT_IN";//"MGT_VHS_IN";//maybe add this to the bank
                outClassValue = "MGT_OUT";//"MGT_VHS_IN";//maybe add this to the bank
                break;
            case "MGT":
                inClassValue = "MGT_IN";
                outClassValue = "MGT_OUT";
                break;
            case "FAST":
                inClassValue = "FAST_IN";
                outClassValue = "FAST_OUT";
                break;
            case "CLOCK":
                inClassValue = "CRITICAL_T_IN";
                outClassValue = "CRITICAL_NT";
                break;
            case "PCIE":
                inClassValue  ="MGT_IN" //"MGT_VHS_IN";//maybe add this to the bank
                outClassValue ="MGT_OUT"//"MGT_VHS_OUT";//maybe add this to the bank
                break;
            case "REGULAR":
                inClassValue  ="REGULAR"
                outClassValue ="REGULAR"
                break;
            case "NONE":
                inClassValue = "NONE";
                outClassValue = "NONE";
                break;

            default:
                inClassValue = "";
                outClassValue = "";
        }

        return {
            ...row,
            inClassNoiseRule: inClassValue,
            outOfClassNoiseRule: outClassValue,
        };
    });

    return guessedData;
};