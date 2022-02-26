import { lazy } from 'react'

const PollList = lazy(() => import("../components/poll/list/PollList.jsx" /* webpackChunkName: 'PollingList'*/))
const PollDetail = lazy(() => import("../components/poll/detail/PollDetail.jsx" /* webpackChunkName: 'PollingDetail'*/))

export const RouteList = [
    {
        path: "/poll",
        exact: true,
        component: PollList,
    },
    {
        path: "/poll/:id",
        exact: true,
        component: PollDetail,
    },
]
