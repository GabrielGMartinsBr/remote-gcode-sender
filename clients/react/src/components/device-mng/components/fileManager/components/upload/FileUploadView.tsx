import UploadArea from './UploadArea';
import UploadList from './UploadList';

interface Props {
}

export default function FileUploadView(props: Props) {
    const { } = props;

    return (
        <div className={`@tw{
            w-full
            border border-orange-400 p-6
            
            flex flex-col
            justify-stretch items-center
            gap-6
            
        }`}>

            <h3 className={`@tw{
                text-3xl leading-normal
                font-light
            }`}>
                File upload
            </h3>

            <div className={`@tw{
                w-full
                border border-purple-600
                flex flex-row
                justify-center items-start
                gap-6
            }`}>

                <UploadArea />

                <UploadList />

            </div>

        </div>
    );
}