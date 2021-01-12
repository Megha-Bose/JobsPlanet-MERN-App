import React from 'react';
interface Props {
    style: any;
    progressBar: number;
    displayProgressBarStatus: string;
    isButtonProgressBar?: boolean;
}
export default class ProgressBar extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
