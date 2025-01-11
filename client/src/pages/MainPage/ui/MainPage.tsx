import classes from './MainPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { TextEditor } from '@/widgets/TextEditor';

export const MainPage = () => (
    <Page className={classNames(classes.MainPage, {}, [])}>
        <div className="w-full">
            <TextEditor />
            {/* <TextEditorPreview */}
            {/*    content={ */}
            {/* /> */}
        </div>
    </Page>
);
