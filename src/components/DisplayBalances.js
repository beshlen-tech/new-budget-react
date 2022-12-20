import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import DisplayBalance from "./DisplayBalance";

function DisplayBalances() {
	return (
		<Segment textAlign="center">
			<Grid columns={2} divided>
				<Grid.Row>
					<Grid.Column>
						<DisplayBalance
							color="green"
							textAlign="left"
							title="Income:"
							value="1,075.53"
						/>
					</Grid.Column>
					<Grid.Column>
						<DisplayBalance
							color="red"
							textAlign="left"
							title="Expenses:"
							value="575.51"
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>
	);
}

export default DisplayBalances;
