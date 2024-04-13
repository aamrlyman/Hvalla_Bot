export class ActivityOutCome {
    isSuccess: boolean;
    roll: number;
    message: string;

    constructor(isSuccess: boolean, roll: number) {
        this.isSuccess = isSuccess;
        this.roll = roll;
        this.message = isSuccess ? "Success" : "Failure";
    }
}

export function calculateActivityOutcome(bonus: boolean, diceRolls: number[]): ActivityOutCome {
    let outcome = isSuccessRole(diceRolls[0]);
    if (bonus && !outcome.isSuccess) {
        outcome = isSuccessRole(diceRolls[1]);
    }
    return outcome;
}

function isSuccessRole(diceRole: number): ActivityOutCome {
    const successRole = diceRole;
    return new ActivityOutCome(successRole > 30, successRole);
}
