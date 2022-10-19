import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useTypedSelector } from '../../redusers/useTypedSelector';
import { ITechnology } from '../../interfaces';
import { FormHelperText, styled } from '@mui/material';

interface IChipSelect {
  tech: ITechnology[],
  setTech: (tech: ITechnology[]) => void,
  check?: boolean,
}

const CustomSelect = styled(Select)(() => ({
  width: '700px',
  height: '50px',
  marginBottom: '0px',
  ['@media (max-width:1024px)']: {
    width: '500px',
  },
  ['@media (max-width:425px)']: {
    width: '300px',
  },
  ['@media (max-width:375px)']: {
    width: '250px',
  }
}))

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ChipSelect: React.FC<IChipSelect> = ({ tech, setTech, check }) => {
  const technologies = useTypedSelector((state) => state.technologies.technologies);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  function MyFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText: string = React.useMemo(() => {
      if (check && !tech[0]) {
        return 'Empty field';
      }
      return '';
    }, [focused]);

    return <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>;
  }

  React.useEffect(() => {
    if (tech !== undefined) {
      tech.map((t) => (
        personName.push(t.name)
      ))
    }
  }, []);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
    var result: Array<ITechnology> = [];
    for (var i = 0; i < value.length; i++) {
      let foundTech = technologies.find(tech => tech.name === value[i])
      result.push(foundTech!);
    }
    setTech(result);
  };

  return (
    <FormControl sx={{ width: 300, mb: 1.3 }}>
      <CustomSelect
        multiple
        displayEmpty
        id='techSelect'
        value={personName}
        onChange={handleChange}
        error={check && !tech[0]}
        //@ts-ignore
        renderValue={(selected: any) => {
          if (!selected.length) {
            return (
              <span style={{ color: `#a7aaac`, fontSize: `14px` }}>
                Select technologies
              </span>
            );
          } else {
            return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          }
        }}
        MenuProps={MenuProps}
      >
        {technologies.map((technology) => (
          <MenuItem
            key={technology.name}
            value={technology.name}
            data-cy={`${technology.name}`}
            style={getStyles(technology.name, personName, theme)}
          >
            {technology.name}
          </MenuItem>
        ))}
      </CustomSelect>
      <MyFormHelperText />
    </FormControl>
  );
}
export default ChipSelect