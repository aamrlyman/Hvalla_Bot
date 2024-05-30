export interface ActivityOutCome {
  isSuccess: boolean;
  roll: number;
  message: string;
}

export function calculateActivityOutcome(
  bonus: boolean,
  diceRolls: number[]
): ActivityOutCome {
  let outcome = isSuccessRole(diceRolls[0]);
  if (bonus && !outcome.isSuccess) {
    outcome = isSuccessRole(diceRolls[1]);
  }
  const OutComeMessage = outcome.isSuccess ? "Success" : "Failure";
  const bonusApplied = bonus ? `Forn Gavir Bonus Applied` : ``;
  return {
    ...outcome,
    message: `${OutComeMessage}, ${bonusApplied}`,
  } as ActivityOutCome;
}

function isSuccessRole(diceRole: number): ActivityOutCome {
  const successRole = diceRole;
  return { isSuccess: successRole > 30, roll: successRole, message: "" };
}
