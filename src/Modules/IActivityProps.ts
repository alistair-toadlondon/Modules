/* plugin architecture for Activities and nested workflows */

export default interface IActivityProps {
    onValidate?: (hasPassedValidation: boolean) => void
    onPrefetchData?: () => void
    onSatisfiedCondition: (event:any) => void
}