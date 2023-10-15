import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloAnchorHack } from "../target/types/hello_anchor_hack";

describe("hello-anchor-hack", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.HelloAnchorHack as Program<HelloAnchorHack>;
  const systemProgram = anchor.web3.SystemProgram;


  it("Create Counter!", async () => {
    // Keypair = account
    const [counter, _counterBump] =
      await anchor.web3.PublicKey.findProgramAddress(
        [program.provider.publicKey.toBytes()],
        program.programId
      );
    console.log("Your counter address", counter.toString());
    const tx = await program.methods
      .initialize()
      .accounts({
        authority: program.provider.publicKey,
        counter: counter,
        systemProgram: systemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Fetch a counter!", async () => {
    // Keypair = account
    const [counterPubkey, _] = await anchor.web3.PublicKey.findProgramAddress(
      [program.provider.publicKey.toBytes()],
      program.programId
    );
    console.log("Your counter address", counterPubkey.toString());
    const counter = await program.account.counter.fetch(counterPubkey);
    console.log("Your counter", counter);
  });

  it("Update a counter!", async () => {
    // Keypair = account
    const [counterPubkey, _] = await anchor.web3.PublicKey.findProgramAddress(
      [program.provider.publicKey.toBytes()],
      program.programId
    );
    console.log("Your counter address", counterPubkey.toString());
    const counter = await program.account.counter.fetch(counterPubkey);
    console.log("Your counter", counter);
    const tx = await program.methods
      .initialize2()
      .accounts({
        counter: counterPubkey,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    const counterUpdated = await program.account.counter.fetch(counterPubkey);
    console.log("Your counter count is: ", counterUpdated.count.toNumber());
  });


  // it("Is initialized!", async () => {
  //   await program.methods
  //     .initialize()
  //     .accounts({
  //       counter: counterKeypair.publicKey,
  //       payer: payer.publicKey,
  //     })
  //     .signers([counterKeypair])
  //     .rpc()

  //   const currentCount = await program.account.counter.fetch(
  //     counterKeypair.publicKey
  //   )
  //   // Add your test here.
  //   const [counter, _counterBump] = await program.methods.initialize().rpc();
  //   console.log("Your transaction signature", tx);

  //   console.log(
  //     currentCount.count.toNumber(),
  //     "Expected initialized count to be 0"
  //   )
  // });

  // it("Is initialized2!", async () => {
  //   // Add your test here.
  //   const tx = await program.methods.initialize2().rpc();
  //   console.log("Your transaction signature", tx);
  // });
});
