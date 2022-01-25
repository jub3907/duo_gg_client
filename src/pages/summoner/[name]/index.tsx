import { GetServerSidePropsContext } from "next"

const SummonerPage = ({name} : {name: string}) => {
    return <div style={{position: "fixed", left: 0, right: 0, bottom: 0, top: 0}}>mainpage, {name}</div>
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const params = ctx.params
    if (!params) {
        return 
    }

    return {
        props : {
            name: params.name
        }
    }
}

export default SummonerPage