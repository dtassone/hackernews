import React from "react";
import { LinearProgress } from "@material-ui/core";

export const PreviewLoader: React.FC<{}> = () => (
	<div className="loading-info">
		<LinearProgress />
	</div>
);
