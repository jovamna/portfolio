import FullWidthLayout from "../../hocs/FullWidthLayout";
import {useParams} from 'react-redux'

const Activate = () =>{
    const params = useParams()

    const token = params.token

    console.log(token)

    return(
        <FullWidthLayout>activate</FullWidthLayout>
    )
}

export default Activate