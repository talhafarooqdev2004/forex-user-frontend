declare global {
    interface Window {
        FJWidgets: {
            createWidget: (options: {
                container: string;
                mode: string;
                width: string;
                height: string;
                backColor: string;
                fontColor: string;
                widgetType: string;
            }) => void;
        };
    }
}

export {};
