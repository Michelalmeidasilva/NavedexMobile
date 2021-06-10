import React, { FC, useMemo } from 'react';

import { TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { variant, space, layout } from 'styled-system';
import styled from 'styled-components/native';

import { theme } from 'src/theme';
import { Text, ColumnProps, Icon, Row } from 'src/components';

const PRIMARY = 'primary';
const SECONDARY = 'secondary';
const DISABLED = 'disabled';

interface ButtonComponentProps extends ColumnProps, TouchableOpacityProps {
  title: string;
  icon?: string;
  variant: string;
  disabled?: boolean;
  isLoading?: boolean;
  accessibilityLabel: string;
}
interface StyledButtonProps extends TouchableOpacityProps {
  variant: string;
}
const ButtonComponent: FC<ButtonComponentProps> = ({
  title,
  variant,
  disabled,
  isLoading,
  icon,
  ...props
}) => {
  const { colors } = theme;

  const textColor = useMemo(
    () => (variant === SECONDARY || DISABLED ? 'white' : 'black'),
    [variant, disabled, colors]
  );

  return (
    <StyledButton variant={disabled ? 'disabled' : variant} disabled={disabled} {...props}>
      {isLoading && <ActivityIndicator size='small' color='white' />}

      {!isLoading && (
        <Row>
          {icon && <Icon icon={icon} marginRight={13} color={textColor} />}

          <Text variant='small' color={textColor} fontWeight={600} lineHeight='24px'>
            {title}
          </Text>
        </Row>
      )}
    </StyledButton>
  );
};

const StyledButton: FC<StyledButtonProps> = styled.TouchableOpacity(
  variant({
    variants: {
      [PRIMARY]: {
        backgroundColor: 'primary',
        borderColor: 'transparent'
      },
      [SECONDARY]: {
        backgroundColor: 'transparent',
        borderColor: 'black'
      },
      [DISABLED]: {
        backgroundColor: 'gray.n500',
        borderColor: 'transparent'
      }
    }
  }),
  `
    padding: 8px;
    min-height: 39px;
    border-width: 1px;
    align-items: center;
    justify-content: center;
  `,
  space,
  layout
);

export default ButtonComponent;
