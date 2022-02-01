import { GetServerSidePropsContext } from "next"

const SummonerStatisticsPage = ({name}: {name: string}) => {
    return <div>statistics, {name}</div>
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const params = ctx.params

    if (!params) {
        return
    }

    return {
        props: {
            name: params.name
        }
    }
}

export default SummonerStatisticsPage