export class ActivityOutCome {
    isSuccess: boolean;
    roll: number;
    message: string;

    constructor(is_Success: boolean, dice_roll: number) {
        this.isSuccess = is_Success;
        this.roll = dice_roll;
        this.message = is_Success ? "Success" : "Failure";
    }
}

export function activity_outcome(bonus: boolean, diceRolls: number[]): ActivityOutCome {
    let outcome = is_Success_Role(diceRolls[0]);
    if (bonus && !outcome.isSuccess) {
        outcome = is_Success_Role(diceRolls[1]);
    }
    return outcome;
}

function is_Success_Role(diceRole: number): ActivityOutCome {
    const success_Role = diceRole;
    return new ActivityOutCome(success_Role > 30, success_Role);
}

// // Example usage:
// const diceRoll1 = 25;
// const diceRoll2 = 40;
// const bonus = true;

// const result1 = activity_outcome(bonus, diceRoll1, diceRoll2);
// console.log(result1); // Output: ActivityOutCome { isSuccess: false, roll: 25, message: 'Failure' }

// const result2 = activity_outcome(false, diceRoll2, diceRoll1);
// console.log(result2); // Output: ActivityOutCome { isSuccess: true, roll: 40, message: 'Success' }
