function createRuleData(name, description, sameLayer, adjacentLayer) {
  return { name, description, sameLayer, adjacentLayer };
}

function createSegmentData(name, maxParallel) {
  return { name, maxParallel };
}

export const parallelismRules = [
  createRuleData(
    "CRITICAL_NT6",
    "CRITICAL_NT is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "CRITICAL_NT5",
    "CRITICAL_NT is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "CRITICAL_NT4",
    "CRITICAL_NT is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "CRITICAL_NT3",
    "CRITICAL_NT is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "CRITICAL_NT",
    "CRITICAL_NT is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "NON_CRITICAL",
    "NON_CRITICAL is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
    ],
  ),
  createRuleData(
    "REGULAR",
    "REGULAR is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "NONE",
    "NONE is a rule designed for Not critical signals , if you dont actually care about the length of the signal , its basically a rule that does nothing",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "CRITICAL_T_IN",
    "CRITICAL_T_IN is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "FAST_OUT",
    "FAST_OUT is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "FAST_IN",
    "FAST_IN is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "RESET",
    "RESET is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "GBE_ANALOG_OUT",
    "GBE_ANALOG_OUT is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "GBE_ANALOG_IN",
    "GBE_ANALOG_IN is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "MGT_OUT",
    "MGT_OUT is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "MGT_IN",
    "MGT_INis a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
  createRuleData(
    "ANALOG_1_OUT",
    "Rule 1 is a rule designed for very high-speed signals for example: PCIe",
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
    [
      createSegmentData("4", 75),
      createSegmentData("5", 150),
      createSegmentData("6", 200),
      createSegmentData("7", 300),
      createSegmentData("9", 600),
      createSegmentData("14", 1500),
      createSegmentData("14.5", 20000),
    ],
  ),
];

export default parallelismRules;