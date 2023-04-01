import { request, gql } from "graphql-request";

export async function getLinear(token: any) {
	const data: any = await request(
		"https://api.linear.app/graphql/",
		gql`
			query ($last: Int) {
				issues(last: $last) {
					nodes {
						assignee {
							name
						}
						cycle {
							startsAt
							endsAt
							number
						}
						dueDate
						title
						project {
							name
							targetDate
							startDate
							progress
							state
						}
						estimate
						labels {
							nodes {
								name
							}
						}
						priorityLabel
						state {
							name
						}
					}
				}
			}
		`,
		{ last: 150 },
		{ Authorization: `Bearer ${token}` }
	);
	return data.issues.nodes;
}
