let _stageVariables;

function setVariables(stageVariables) {
  console.log('setting variables from api gateay', stageVariables);
  _stageVariables = stageVariables;
}

function getStageVariables() {
  return _stageVariables || {};
}

exports.setVariables = setVariables;

exports.getStageVariables = getStageVariables;
