use anchor_lang::prelude::*;

declare_id!("8ncs7zruassJLwQ2xFPGfNx8qJ6ydDs57jNjmQBcc5xQ");

#[derive(Accounts)]
pub struct Hello {
}


#[program]
pub mod hello_anchor_hack {
    use super::*;

    pub fn initialize(ctx: Context<CreateCounter>) -> Result<()> {
        msg!("Creating a Counter!!");

        // The creation of the counter must be here
        let counter = &mut ctx.accounts.counter;
        counter.authority = ctx.accounts.authority.key();
        counter.count = 0;

        
        msg!("Current count is {}", counter.count);
        msg!("The Admin PubKey is: {} ", counter.authority);

        Ok(())
    }

    pub fn initialize2(ctx: Context<UpdateCounter>) -> Result<()> {
        msg!("Adding 1 to the counter!!");

        // Updating the counter must be here 
        let counter = &mut ctx.accounts.counter;
        counter.authority = ctx.accounts.authority.key();
        counter.count += 1;

        msg!("Current count is {}", counter.count);
        msg!("{} remaining to reach 1000 ", 1000 - counter.count);
        Ok(())
    }
}

// #[derive(Accounts)]
// pub struct Initialize {}

// #[derive(Accounts)]
// pub struct Initialize2 {}

#[derive(Accounts)]
pub struct CreateCounter<'info> {
    #[account(mut)]
    authority: Signer<'info>,
    #[account(
        init,
        seeds = [authority.key().as_ref()],
        bump,
        payer = authority,
        space = 100
    )]
    counter: Account<'info, Counter>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateCounter<'info> {
    authority: Signer<'info>,
    #[account(mut, has_one = authority)]
    counter: Account<'info, Counter>,
}

// Data structures
#[account]
pub struct Counter {
    authority: Pubkey,
    count: u64,
}
