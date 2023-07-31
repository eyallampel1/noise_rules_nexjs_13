function createRuleData(name, sameLayer, adjacentLayer) {
  return { name, sameLayer, adjacentLayer };
}

function createSegmentData(name, maxParallel) {
  return { name, maxParallel };
}

const parallelismRules = [
  createRuleData(
    "CRITICAL_NT",
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