use anchor_lang::prelude::*;

declare_id!("8ncs7zruassJLwQ2xFPGfNx8qJ6ydDs57jNjmQBcc5xQ");

#[derive(Accounts)]
pub struct Hello {
}


#[program]
pub mod hello_anchor_hack {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        msg!("we're all in our private traps");
        Ok(())
    }

    pub fn initialize2(_ctx: Context<Initialize>) -> Result<()> {
        msg!("we're all have a choice");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct Initialize2 {}