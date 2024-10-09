export interface ActivityOutCome {
  isSuccess: boolean;
  roll: number;
  message: string;
}

export function calculateActivityOutcome(
  bonus: boolean,
  diceRoller: CallableFunction
): ActivityOutCome {
  let outcome = isSuccessRole(diceRoller());
  if (bonus && !outcome.isSuccess) {
    outcome = isSuccessRole(diceRoller());
  }
  const OutComeMessage = outcome.isSuccess ? "Success" : "Failure";
  const bonusApplied = bonus ? `, Forn Gavir Bonus Applied` : ``;
  return {
    ...outcome,
    message: `${OutComeMessage} ${bonusApplied}`,
  } as ActivityOutCome;
}

function isSuccessRole(diceRole: number): ActivityOutCome {
  const successRole = diceRole;
  return { isSuccess: successRole > 30, roll: successRole, message: "" };
}
