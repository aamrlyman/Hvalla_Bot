export interface userInputsTestCases {
    input: string;
    name: string;
}
export declare const userInputs: userInputsTestCases[];
export interface UserInputPropertyTestCases {
    name: string;
    input: string;
    expected: {
        zone: string;
        area: string;
        id: string;
        name: string;
        prey: string | null | undefined;
    };
}
export declare const userInputPropertyTests: UserInputPropertyTestCases[];
interface BadUserInput {
    name: string;
    input: string;
    expected: string;
}
export declare const badUserInputs: BadUserInput[];
export {};
