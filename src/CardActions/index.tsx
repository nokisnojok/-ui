import React from 'react';
import styled from 'styled-components';

interface CardActionsBaseStyledComponentProps {
  disableActionSpacing: boolean;
}

const CardActionsBaseStyledComponent = styled.div<CardActionsBaseStyledComponentProps>`
  padding: ${({ disableActionSpacing }) => (disableActionSpacing ? '8px' : '8px 4px')};
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

const CardActionDisableActions = styled(React.Fragment)`
  margin: 0px 4px;
`;

interface CardActionsAttr {
  disableActionSpacing?: boolean;
  children?: React.ReactNode | React.ReactNodeArray;
}

export type CardActionsProps = React.HTMLAttributes<HTMLDivElement> & CardActionsAttr;

const CardActions: React.StatelessComponent<CardActionsProps> = function(props: CardActionsProps) {
  const { disableActionSpacing, children, ...other } = props;
  return (
    <CardActionsBaseStyledComponent disableActionSpacing={!!disableActionSpacing} {...other}>
      {disableActionSpacing
        ? children
        : React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              const Component = (props: any) => React.cloneElement(child, props);
              return <CardActionDisableActions as={Component} />;
            }
          })}
    </CardActionsBaseStyledComponent>
  );
};

CardActions.defaultProps = {
  disableActionSpacing: false
};

export default CardActions;
