import React from "react";

import { Box, Button, Notification, Paragraph} from "grommet"

export function ToastMessage() {
    const [visible, setVisible] = React.useState();
    
    return (
      <Box>
          <Notification
            toast
            title="Toast Notification"
            message="This is an example of a toast notification"
            onClose={() => setVisible(false)}
          />
        
      </Box>
    );
    }