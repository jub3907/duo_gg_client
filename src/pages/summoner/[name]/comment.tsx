import { GetServerSidePropsContext } from "next"

const SummonerCommentPage = ({name} : {name: string}) => {
    return <div>commentpage, {name}</div>
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

export default SummonerCommentPage